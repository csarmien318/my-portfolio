import React from "react";

class TableHeader extends React.Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (column.path && sortColumn.order === "asc")
      return <i className="fa fa-sort-asc" />;
    if (column.path) return <i className="fa fa-sort-desc" />;
  };

  isClickable = (column) => {
    return column.path ? "clickable" : "";
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className={this.isClickable(column)}
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
