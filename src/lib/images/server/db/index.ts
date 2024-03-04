import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';
import type { Map, MarkerData } from '../../../../model';

const db = new Database(DB_PATH, { verbose: console.log });

export function getMaps(limit = 51): Map[] {
    const sql = `
  select name from maps limit $limit  
  `;
    const stmnt = db.prepare(sql);
    const rows = stmnt.all({ limit });
    return rows as Map[];
}

interface DBMarker {
    lat: number;
    lng: number;
};

export function getMarkersForMap(id: number): MarkerData[] {
    const sql = `
    select lat, lng from markers where map_id = $id
    `;
    const stmnt = db.prepare(sql);
    const rows = stmnt.all({ id });
    const dbMarkers = rows as DBMarker[];
    return dbMarkers.map(({ lat, lng }) => ({
        latlng: { lat, lng },
        comments: []
    })) as MarkerData[];
}