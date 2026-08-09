import type { Profile } from '@/types/profile';

export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const res = await fetch(`/api/profile?userId=${userId}`);
    if (!res.ok) {
      console.error('Error fetching profile via API:', await res.text());
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch profile API:', err);
    return null;
  }
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
  try {
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, updates })
    });
    
    if (!res.ok) {
      throw new Error(`Failed to update profile: ${await res.text()}`);
    }
    return await res.json();
  } catch (err) {
    console.error('Error updating profile API:', err);
    throw err;
  }
}
