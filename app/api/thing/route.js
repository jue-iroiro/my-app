// app/api/thing/route.js
import dbConnect from '@/lib/dbConnect';
import Thing from '@/models/Thing';

export async function GET(req) {
  await dbConnect();
  try {
    const things = await Thing.find({});
    return new Response(JSON.stringify({ success: true, data: things }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const thing = await Thing.create(body);
    return new Response(JSON.stringify({ success: true, data: thing }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}