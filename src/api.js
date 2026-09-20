const API_BASE_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.message || "Registration failed.");
  }
  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.message || "Login failed.");
  }
  return data;
};

export const getUserProfile = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/profile/${encodeURIComponent(email)}`);
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.message || "Failed to fetch user profile.");
  }
  return data.user;
};

export const updateUserProfile = async (profileData) => {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.message || "Failed to update profile.");
  }
  return data.user;
};

export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/users`);
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.message || "Failed to fetch users.");
  }
  return data;
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASE_URL}/auth/users/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.message || "Failed to delete user.");
  }
  return data;
};

export const getAdminStats = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/stats`);
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.message || "Failed to fetch statistics.");
  }
  return data;
};

export const getScholarships = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.search) queryParams.append("search", filters.search);
  if (filters.country) queryParams.append("country", filters.country);
  if (filters.degree) queryParams.append("degree", filters.degree);

  const url = `${API_BASE_URL}/scholarships?${queryParams.toString()}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.message || "Failed to fetch scholarships.");
  }
  return data;
};

export const createScholarship = async (scholarshipData) => {
  const response = await fetch(`${API_BASE_URL}/scholarships`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(scholarshipData),
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.message || "Failed to create scholarship.");
  }
  return data;
};

export const updateScholarship = async (id, scholarshipData) => {
  const response = await fetch(`${API_BASE_URL}/scholarships/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(scholarshipData),
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.message || "Failed to update scholarship.");
  }
  return data;
};

export const deleteScholarship = async (id) => {
  const response = await fetch(`${API_BASE_URL}/scholarships/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.message || "Failed to delete scholarship.");
  }
  return data;
};
