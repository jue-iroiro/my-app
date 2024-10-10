// app/api/thing/[id]/route.js
import dbConnect from '@/lib/dbConnect';
import Thing from '@/models/Thing';

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const thing = await Thing.findById(id);
    if (!thing) {
      return new Response(JSON.stringify({ success: false, error: 'Thing not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, data: thing }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const body = await req.json();
    const thing = await Thing.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!thing) {
      return new Response(JSON.stringify({ success: false, error: 'Thing not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, data: thing }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

export async function PATCH(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const body = await req.json();
    const thing = await Thing.findByIdAndUpdate(id, body, { new: true });
    if (!thing) {
      return new Response(JSON.stringify({ success: false, error: 'Thing not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, data: thing }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedThing = await Thing.findByIdAndDelete(id);
    if (!deletedThing) {
      return new Response(JSON.stringify({ success: false, error: 'Thing not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, data: {} }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}