"use server";

export async function checkArchivePassword(password: string): Promise<boolean> {
  return password === process.env.ARCHIVE_PASSWORD;
}
