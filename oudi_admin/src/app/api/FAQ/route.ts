import { NextRequest, NextResponse } from "next/server";
import pool from '@/lib/db';

export default async function handler(req: NextRequest, res: NextResponse) {
    if (req.method === 'GET') {
        const [rows] = await pool.query('SELECT * FROM faq');
        return NextResponse.json(rows);
    }
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });

    if (req.method === 'POST') {
        const { question, answer } = await req.json();
        const [result] = await pool.query('INSERT INTO faq (question, answer) VALUES (?, ?)', [question, answer]);
        return NextResponse.json(result);
    }
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });

    if (req.method === 'PUT') {
        const { id, question, answer } = await req.json();
        const [result] = await pool.query('UPDATE faq SET question = ?, answer = ? WHERE id = ?', [question, answer, id]);
        return NextResponse.json(result);
    }
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });

    if (req.method === 'DELETE') {
        const { id } = await req.json();
        const [result] = await pool.query('DELETE FROM faq WHERE id = ?', [id]);
        return NextResponse.json(result);
    }
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
