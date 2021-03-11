import React from 'react';
import PropTypes from 'prop-types';

import './PageContainer.scss';

/**
 * Component for showing the pages.
 */
const PageContainer = (props) => (
  <main className="container my-3 content-container">
    <div className="row justify-content-md-center">
      <div className="col-xl-6 col-9">
        {props.children}
      </div>

      {props.sidePanes
        && (
        <div className="col-3">
          {props.sidePanes}
        </div>
        )}
    </div>
  </main>
);

PageContainer.defaultProps = {
  children: [],
  sidePanes: undefined,
};

PageContainer.propTypes = {
  children: PropTypes.node,
  sidePanes: PropTypes.node,
};

export default PageContainer;
