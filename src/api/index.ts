import { Project } from "../utils/types";

const baseUrl = "/.netlify/functions";

async function request<T>(url: string) {
  const response = await fetch(`${baseUrl}/${url}`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  const data = (await response.json()) as T;
  return data;
}

async function post(url: string, data: Omit<Project, "id">) {
  return await fetch(`${baseUrl}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(data),
  });
}

export const fetchProjectsList = () => request<Project[]>("projects");
export const newProject = (data: Omit<Project, "id">) => post("projects", data);
