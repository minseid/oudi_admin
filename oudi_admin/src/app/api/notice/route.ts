import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    const [rows] = await pool.query('SELECT * FROM notice');
    return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
    const { title, description } = await req.json();
    const [result] = await pool.query('INSERT INTO notice (title, description) VALUES (?, ?)', [title, description]);
    return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
    const { id, title, description } = await req.json();
    const [result] = await pool.query('UPDATE notice SET title = ?, description = ? WHERE id = ?', [title, description, id]);
    return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    const [result] = await pool.query('DELETE FROM notice WHERE id = ?', [id]);
    return NextResponse.json(result);
}