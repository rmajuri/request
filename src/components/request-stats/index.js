import React from 'react';

import './_request-stats.scss';

import { StaticQuery, graphql } from 'gatsby';

const RequestStats = () => (
    <StaticQuery
        query={ graphql`
      query HowtoQuery {
        allDataJson {
          edges {
            node {
              howTo {
                title
              }
            }
          }
        }
      }
    ` }
        render={ (data) => (
            <section className="request-stats" id="request-stats">
                <div className="container">
                    <div className="row">
                        <div className="offset-1 col-9">
                            <h1 className="request-stats-title">See what others are requesting.</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-1" />
                    </div>
                </div>
            </section>
        ) } />
);

export default RequestStats;
