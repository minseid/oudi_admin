import {NextRequest, NextResponse} from 'next/server';
import pool from '@/lib/db';

export default async function handler(req:Request) {
    if(req.method === "PUT"){
        const {id,answer} = await req.json();
        const [result] = await pool.query('UPDATE answer SET answer = ? WHERE id = ? ',[answer,id]);

    }
    if(req.method === "GET"){
        const [result] = await pool.query('SELECT * FROM inquiry ');
    }
    if(req.method === "DELETE"){
        const {id} = await req.json();
        const [result] = await pool.query('DELETE FROM inquiry WHERE id = ?',[id]);
    }
}