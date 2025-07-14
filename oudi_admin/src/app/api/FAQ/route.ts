import { NextRequest, NextResponse } from "next/server";
import pool from '@/lib/db';

export async function GET() {
    const [rows] = await pool.query('SELECT * FROM faq');
    return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
    const { question, answer } = await req.json();
    const [result] = await pool.query('INSERT INTO faq (question, answer) VALUES (?, ?)', [question, answer]);
    return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
    const { id, question, answer } = await req.json();
    const [result] = await pool.query('UPDATE faq SET question = ?, answer = ? WHERE id = ?', [question, answer, id]);
    return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    const [result] = await pool.query('DELETE FROM faq WHERE id = ?', [id]);
    return NextResponse.json(result);
}