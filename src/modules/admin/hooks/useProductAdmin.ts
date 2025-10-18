import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getProductListAPI,
  createProductAPI,
  getProductByIdAPI,
  updateProductAPI,
  deleteProductAPI,
  updateProductStatusAPI,
  duplicateProductAPI,
} from '../infrastructure/productAdmin.api';
import {
  GetProductListQuery,
  CreateProductRequest,
  UpdateProductRequest,
  UpdateProductStatusRequest,
} from '../domain/types';

// Query keys
export const adminProductKeys = {
  all: ['admin-products'] as const,
  lists: () => [...adminProductKeys.all, 'list'] as const,
  list: (params?: GetProductListQuery) =>
    [...adminProductKeys.lists(), params] as const,
  details: () => [...adminProductKeys.all, 'detail'] as const,
  detail: (id: string) => [...adminProductKeys.details(), id] as const,
};

// Hook for getting product list
export function useGetProductList(params?: GetProductListQuery) {
  return useQuery({
    queryKey: adminProductKeys.list(params),
    queryFn: () => getProductListAPI(params),
    select: response => response.data,
  });
}

// Hook for getting product by ID
export function useGetProductById(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: adminProductKeys.detail(id),
    queryFn: () => getProductByIdAPI(id),
    select: response => response.data,
    enabled: enabled && !!id,
  });
}

// Hook for creating product
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => createProductAPI(data),
    onSuccess: response => {
      toast.success('Khóa học đã được tạo thành công');
      // Invalidate and refetch product list
      queryClient.invalidateQueries({ queryKey: adminProductKeys.lists() });
      return response.data;
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Không thể tạo khóa học');
    },
  });
}

// Hook for updating product
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductRequest }) =>
      updateProductAPI(id, data),
    onSuccess: (response, variables) => {
      toast.success('Khóa học đã được cập nhật thành công');
      // Invalidate and refetch product list and detail
      queryClient.invalidateQueries({ queryKey: adminProductKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: adminProductKeys.detail(variables.id),
      });
      return response.data;
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Không thể cập nhật khóa học'
      );
    },
  });
}

// Hook for deleting product
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProductAPI(id),
    onSuccess: () => {
      toast.success('Khóa học đã được xóa thành công');
      // Invalidate and refetch product list
      queryClient.invalidateQueries({ queryKey: adminProductKeys.lists() });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Không thể xóa khóa học');
    },
  });
}

// Hook for updating product status
export function useUpdateProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateProductStatusRequest;
    }) => updateProductStatusAPI(id, data),
    onSuccess: (response, variables) => {
      toast.success('Trạng thái khóa học đã được cập nhật');
      // Invalidate and refetch product list and detail
      queryClient.invalidateQueries({ queryKey: adminProductKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: adminProductKeys.detail(variables.id),
      });
      return response.data;
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Không thể cập nhật trạng thái'
      );
    },
  });
}

// Hook for duplicating product
export function useDuplicateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => duplicateProductAPI(id),
    onSuccess: response => {
      toast.success('Khóa học đã được nhân bản thành công');
      // Invalidate and refetch product list
      queryClient.invalidateQueries({ queryKey: adminProductKeys.lists() });
      return response.data;
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Không thể nhân bản khóa học'
      );
    },
  });
}
