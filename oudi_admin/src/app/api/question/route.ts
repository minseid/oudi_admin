import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    const [result] = await pool.query('SELECT * FROM question');
    return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
    const { id, answer } = await req.json();
    const [result] = await pool.query('UPDATE answer SET answer = ? WHERE id = ?', [answer, id]);
    return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    const [result] = await pool.query('DELETE FROM question WHERE id = ?', [id]);
    return NextResponse.json(result);
}