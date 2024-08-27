import useAxios from "../useAxios";

export const getAlertCount = async (): Promise<number> => {
    try {
      const response = await useAxios.get<{ alertCount: number }>('/alerts/count');
      
      return response.data.alertCount;
    } catch (error) {
      console.error('Error fetching alert count:', error);
      throw error;
    }
  };