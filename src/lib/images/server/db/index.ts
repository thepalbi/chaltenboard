import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';
import type { Map } from '../../../../model';

const db = new Database(DB_PATH, { verbose: console.log });

export function getMaps(limit = 51): Map[] {
  const sql = `
  select name from maps limit $limit  
  `;
  const stmnt = db.prepare(sql);
  const rows = stmnt.all({ limit });
  return rows as Map[];
}