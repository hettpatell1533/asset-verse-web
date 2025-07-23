const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    return this.request('/Login/Login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdBy
  }) {
    return this.request('/AdminRegistration/CreateRegistration', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Asset endpoints
  async getAssets(params?: { page?: number; limit?: number; category?: string; location?: string }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    return this.request(`/assets${queryString ? `?${queryString}` : ''}`);
  }

  async getAsset(id: string) {
    return this.request(`/assets/${id}`);
  }

  async createAsset(assetData: any) {
    return this.request('/assets', {
      method: 'POST',
      body: JSON.stringify(assetData),
    });
  }

  async updateAsset(id: string, assetData: any) {
    return this.request(`/assets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(assetData),
    });
  }

  async deleteAsset(id: string) {
    return this.request(`/assets/${id}`, {
      method: 'DELETE',
    });
  }

  // Dashboard endpoints
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  async getRecentActivities() {
    return this.request('/dashboard/activities');
  }

 

  // Locations endpoints
  async getLocations() {
    return this.request('/locations');
  }

  async createLocation(locationData: { name: string; description?: string }) {
    return this.request('/locations', {
      method: 'POST',
      body: JSON.stringify(locationData),
    });
  }

  // Users endpoints
  async getUsers() {
    return this.request('/users');
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(profileData: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getEmployee(pageNumber:number, pageSize:number){
    return this.request(`/Employee/GetAll?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  //Position endpoints
  async getPositions(pageNumber:number,pageSize:number){
    return this.request(`/Position/GetAll?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
  async getPositionById(id:number){
    return this.request(`/Position/GetById/${id}`)
  }
  async updatePosition(id:number, data: Record<string, any>){
    return this.request(`/Position/UpdatePosition?id=${id}`,{
      method:"PUT",
      body:JSON.stringify(data)
    })
  }
  async createPosition(data:Record<string, any>){
    return this.request("/Position/CreatePosition",{
      method:"POST",
      body:JSON.stringify(data)
    })
  }
  async deletePositon(id:number){
    return this.request(`/Position/DeletePosition/${id}`,{
      method:"DELETE"
    })
  }

  // Categories endpoints
  async getCategories(pageNumber:number,pageSize:number){
    return this.request(`/Category/GetAll?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
  async getCategoryById(id:number){
    return this.request(`/Category/GetById/${id}`)
  }
   async createCategory(data:Record<string, any>) {
    return this.request('/Category/CreateCategory', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  async updateCategory(id:number, data: Record<string, any>){
    return this.request(`/Category/UpdateCategory?id=${id}`,{
      method:"PUT",
      body:JSON.stringify(data)
    })
  }
  async deleteCategory(id:number){
    return this.request(`/Category/DeleteCategory/${id}`,{
      method:"DELETE"
    })
  }

  // SubCategory endpoints
  async getSubCategories(pageNumber:number,pageSize:number){
    return this.request(`/SubCategory/GetAll?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
  async getSubCategoryById(id:number){
    return this.request(`/SubCategory/GetById/${id}`)
  }
  async createSubCategory(data:Record<string, any>) {
    return this.request('/SubCategory/CreateSubCategory', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  async updateSubCategory(id:number, data: Record<string, any>){
    return this.request(`/SubCategory/UpdateSubCategory?id=${id}`,{
      method:"PUT",
      body:JSON.stringify(data)
    })
  }
  async deleteSubCategory(id:number){
    return this.request(`/SubCategory/DeleteSubCategory/${id}`,{
      method:"DELETE"
    })
  }

}

export const apiService = new ApiService();