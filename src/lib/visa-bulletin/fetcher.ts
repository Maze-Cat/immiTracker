import { parseVisaBulletin } from './parser';
import { storeBulletin } from './store';
import type { VisaBulletin } from '@/types/visa-bulletin';

const VISA_BULLETIN_URL = 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html';

export async function fetchAndStoreBulletin(): Promise<{ bulletinMonth: string }> {
  // Fetch the Visa Bulletin index page to find the latest bulletin URL
  const indexResponse = await fetch(VISA_BULLETIN_URL, { next: { revalidate: 0 } });
  if (!indexResponse.ok) {
    throw new Error(`Failed to fetch Visa Bulletin index: ${indexResponse.status}`);
  }
  const indexHtml = await indexResponse.text();

  // Parse the latest bulletin URL from the index page
  const bulletinUrlMatch = indexHtml.match(/href="(\/content\/travel\/en\/legal\/visa-law0\/visa-bulletin\/\d{4}\/visa-bulletin-for[^"]+)"/i);
  if (!bulletinUrlMatch) {
    throw new Error('Could not find latest bulletin URL');
  }

  const bulletinUrl = `https://travel.state.gov${bulletinUrlMatch[1]}`;
  const bulletinResponse = await fetch(bulletinUrl, { next: { revalidate: 0 } });
  if (!bulletinResponse.ok) {
    throw new Error(`Failed to fetch bulletin page: ${bulletinResponse.status}`);
  }

  const bulletinHtml = await bulletinResponse.text();
  const bulletin = parseVisaBulletin(bulletinHtml);

  await storeBulletin(bulletin);

  return { bulletinMonth: bulletin.bulletinMonth };
}
