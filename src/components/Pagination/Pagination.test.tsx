import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './Pagination';
import { expect, it, describe, beforeEach, vi } from 'vitest';

describe('Pagination Component', () => {
  const onPageChange = vi.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  const renderComponent = (currentPage: number, totalPages: number) => {
    return render(
      <MemoryRouter initialEntries={[`/?page=${currentPage}`]}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </MemoryRouter>,
    );
  };

  it('should update URL query parameter when page changes', () => {
    const { container } = renderComponent(1, 10);

    const secondPageLink = container.querySelector('a[href="/?page=2"]');
    expect(secondPageLink).toBeInTheDocument();
    if (secondPageLink) {
      fireEvent.click(secondPageLink);
    }

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
