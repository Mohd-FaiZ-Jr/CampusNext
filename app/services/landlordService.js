const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Get authenticated landlord's profile
 */
export const getLandlordProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/api/landlord/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies for authentication
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
};

/**
 * Update landlord profile
 */
export const updateLandlordProfile = async (profileData) => {
  const response = await fetch(`${API_BASE_URL}/api/landlord/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies for authentication
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data;
};

/**
 * Get public landlord profile by ID
 */
export const getPublicLandlordProfile = async (landlordId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/landlord/profile/${landlordId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch landlord profile");
  }

  return data;
};
