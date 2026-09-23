export async function POST() {
  const atual = process.env.MOCK_SAFETY_BLOCK === "true";
  process.env.MOCK_SAFETY_BLOCK = atual ? "false" : "true";

  return Response.json({ mockAtivo: !atual });
}

export async function GET() {
  return Response.json({ mockAtivo: process.env.MOCK_SAFETY_BLOCK === "true" });
}