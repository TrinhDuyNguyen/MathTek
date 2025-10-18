'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';

interface DataTableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  columns: DataTableColumn[];
  data: any[];
  handleSeeAll?: () => void;
  onEdit?: (row: any) => void;
  onView?: (row: any) => void;
  onDelete?: (row: any) => void;
  isEditing?: boolean;
}

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      title,
      columns,
      data,
      handleSeeAll,
      onEdit,
      onView,
      onDelete,
      isEditing = true,
    },
    ref
  ) => {
    const memoColumns = React.useMemo(() => columns, [columns]);
    const [openDropdown, setOpenDropdown] = React.useState<number | null>(null);

    const handleDropdownToggle = (index: number) => {
      setOpenDropdown(openDropdown === index ? null : index);
    };

    const handleActionClick = (action: string, row: any) => {
      if (action === 'edit' && onEdit) {
        onEdit(row);
      } else if (action === 'view' && onView) {
        onView(row);
      } else if (action === 'delete' && onDelete) {
        onDelete(row);
      }
      setOpenDropdown(null);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = () => {
        if (openDropdown !== null) {
          setOpenDropdown(null);
        }
      };

      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [openDropdown]);

    return (
      <Card ref={ref} className='bg-white border-gray-200 shadow-sm'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  {memoColumns.map(column => (
                    <th
                      key={column.key}
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      {column.label}
                    </th>
                  ))}
                  {isEditing && (
                    <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Hành động
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {data.map((row, index) => (
                  <tr key={index} className='hover:bg-gray-50'>
                    {memoColumns.map(column => (
                      <td
                        key={column.key}
                        className='px-6 py-4 whitespace-nowrap'
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </td>
                    ))}
                    <td className='px-6 py-4 whitespace-nowrap text-right relative'>
                      <div className='relative'>
                        {isEditing && (
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8'
                            onClick={e => {
                              e.stopPropagation();
                              handleDropdownToggle(index);
                            }}
                          >
                            <MoreVertical className='w-4 h-4' />
                          </Button>
                        )}

                        {openDropdown === index && (
                          <div className='absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50'>
                            {onEdit && (
                              <div
                                className='px-3 py-2 items-start flex text-sm cursor-pointer hover:bg-gray-100'
                                onClick={() => handleActionClick('edit', row)}
                              >
                                Chỉnh sửa
                              </div>
                            )}
                            {onView && (
                              <div
                                className='px-3 py-2 items-start flex text-sm cursor-pointer hover:bg-gray-100'
                                onClick={() => handleActionClick('view', row)}
                              >
                                Xem chi tiết
                              </div>
                            )}
                            {onDelete && (
                              <div
                                className='px-3 py-2 items-start flex text-sm cursor-pointer hover:bg-gray-100 text-red-600'
                                onClick={() => handleActionClick('delete', row)}
                              >
                                Xóa
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        {handleSeeAll && (
          <CardFooter>
            <div
              role='presentation'
              onClick={handleSeeAll}
              className='w-full flex justify-end cursor-pointer mt-3 font-semibold'
            >
              Xem tất cả
            </div>
          </CardFooter>
        )}
      </Card>
    );
  }
);
DataTable.displayName = 'DataTable';

export { DataTable };
