import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-a1939573/health", (c) => {
  return c.json({ status: "ok" });
});

// Submit a new application
app.post("/make-server-a1939573/applications", async (c) => {
  try {
    const body = await c.req.json();
    const id = Date.now().toString();
    const application = {
      id,
      ...body,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };
    await kv.set(`application:${id}`, application);
    return c.json({ success: true, id });
  } catch (e) {
    console.log("Error submitting application:", e);
    return c.json({ error: `Failed to submit application: ${e}` }, 500);
  }
});

// Get all applications
app.get("/make-server-a1939573/applications", async (c) => {
  try {
    const apps = await kv.getByPrefix("application:");
    apps.sort((a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    return c.json(apps);
  } catch (e) {
    console.log("Error getting applications:", e);
    return c.json({ error: `Failed to get applications: ${e}` }, 500);
  }
});

// Update application status
app.put("/make-server-a1939573/applications/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const { status } = await c.req.json();
    const application = await kv.get(`application:${id}`);
    if (!application) return c.json({ error: "Application not found" }, 404);
    application.status = status;
    await kv.set(`application:${id}`, application);
    return c.json({ success: true });
  } catch (e) {
    console.log("Error updating application:", e);
    return c.json({ error: `Failed to update application: ${e}` }, 500);
  }
});

// Delete an application
app.delete("/make-server-a1939573/applications/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`application:${id}`);
    return c.json({ success: true });
  } catch (e) {
    console.log("Error deleting application:", e);
    return c.json({ error: `Failed to delete application: ${e}` }, 500);
  }
});

Deno.serve(app.fetch);
