import { Handler } from "@netlify/functions";
import { MongoClient, Db, Collection } from "mongodb";
import { nanoid } from "nanoid";

// Define environment variables
const MONGODB_URI = process.env.MONGODB_URI as string;
const DB_NAME = process.env.DB_NAME as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

if (!DB_NAME) {
  throw new Error("Please define the DB_NAME environment variable inside .env");
}

// MongoDB client and database
let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  db = client.db(DB_NAME);
  return db;
}

// Define a type for the project
interface Project {
  id: string;
  name: string;
  strokes: Stroke[];
  image: string;
}

interface Stroke {
  point: Point[];
}

interface Point {
  x: number;
  y: number;
}

// API Handler
export const handler: Handler = async (event, _context) => {
  const { httpMethod, body } = event;

  try {
    const database = await connectToDatabase();
    const projectsCollection: Collection<Project> =
      database.collection("projects");

    switch (httpMethod) {
      case "GET": {
        const projects = await projectsCollection.find({}).toArray();
        if (!projects) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: "No projects found." }),
          };
        }
        return {
          statusCode: 200,
          body: JSON.stringify(projects),
        };
      }
      case "POST": {
        // Add a new project

        const {
          name,
          image,
          strokes,
        }: { name: string; image: string; strokes: Stroke[] } = JSON.parse(
          body ?? "{}"
        );

        if (!name || !image || !strokes) {
          return {
            statusCode: 400,
            body: JSON.stringify({
              error: "Name, image, and strokes are required.",
            }),
          };
        }

        const newProject: Project = {
          name,
          image,
          strokes,
          id: nanoid(),
        };
        try {
          const result = await projectsCollection.insertOne(newProject);
          console.log(`New project inserted with id: ${result.insertedId}`);
          return {
            statusCode: 200,
            body: JSON.stringify(newProject),
          };
        } catch (insertError) {
          console.error("Error inserting project:", insertError);
          return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error inserting project." }),
          };
        }
      }

      case "DELETE": {
        // Delete a project by ID
        const { id }: { id: string } = JSON.parse(body ?? "{}");
        if (!id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: "ID is required." }),
          };
        }

        const result = await projectsCollection.deleteOne({ id });
        if (result.deletedCount === 0) {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: "Project not found." }),
          };
        }

        return {
          statusCode: 200,
          body: JSON.stringify({ id }),
        };
      }

      default: {
        return {
          statusCode: 405,
          body: JSON.stringify({ error: `Method ${httpMethod} Not Allowed` }),
        };
      }
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
