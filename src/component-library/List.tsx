import PropTypes from 'prop-types';
import React from 'react';

type ListProps<TDataItem> = {
  readonly data: ReadonlyArray<TDataItem>
  readonly renderItem: (item: TDataItem) => React.ReactNode;
}

const propTypes = {
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export function List<TDataItem>({ data, renderItem }: ListProps<TDataItem>): ReturnType<React.FC> {
  return (
    <div>
      {data.map(renderItem)}
    </div>
  );
}

(List as React.FC).propTypes = propTypes;
