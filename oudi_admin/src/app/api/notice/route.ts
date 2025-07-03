import {NextRequest, NextResponse} from 'next/server';
import pool from '@/lib/db';

export default async function handler(req:Request) {
    if (req.method === 'GET'){
        const  [rows] = await pool.query('SELECT * FROM notice');
        return NextResponse.json(rows);
    
    }
    if (req.method === 'POST'){
        const {title, descrption} = await req.json();
        const [result] = await pool.query('INSERT INTO notice (title, description) VALUES (?,?)',[title, descrption] );
        return NextResponse.json(result);
    }
    if (req.method === 'DELETE'){
        const {id} = await req.json();
        const [result] = await pool.query('DELETE FROM notice WHERE id =? ');
        return NextResponse.json(result);
    }
    if (req.method === 'PUT'){
        const {id,title, description} = await req.json();
        const [result] = await pool.query('UPDATE notice SET title = ? descripion =? WHERE id = ?',[title,description,id]);
        
    }
    
}