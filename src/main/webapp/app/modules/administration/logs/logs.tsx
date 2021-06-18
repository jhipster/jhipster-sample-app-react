import React, { useState, useEffect } from 'react';
import { Translate } from 'react-jhipster';

import { getLoggers, changeLogLevel } from '../administration.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LogsPage = () => {
  const [filter, setFilter] = useState('');
  const logs = useAppSelector(state => state.administration.logs);
  const isFetching = useAppSelector(state => state.administration.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLoggers());
  }, []);

  const changeLevel = (loggerName, level) => () => dispatch(changeLogLevel(loggerName, level));

  const changeFilter = evt => setFilter(evt.target.value);

  const getClassName = (level, check, className) => (level === check ? `btn btn-sm btn-${className}` : 'btn btn-sm btn-light');

  const filterFn = l => l.name.toUpperCase().includes(filter.toUpperCase());

  const loggers = logs ? Object.entries(logs.loggers).map(e => ({ name: e[0], level: e[1].effectiveLevel })) : [];

  return (
    <div>
      <h2 id="logs-page-heading" data-cy="logsPageHeading">
        <Translate contentKey="logs.title">Logs</Translate>
      </h2>
      <p>
        <Translate contentKey="logs.nbloggers" interpolate={{ total: loggers.length }}>
          There are {loggers.length.toString()} loggers.
        </Translate>
      </p>

      <span>
        <Translate contentKey="logs.filter">Filter</Translate>
      </span>
      <input type="text" value={filter} onChange={changeFilter} className="form-control" disabled={isFetching} />

      <table className="table table-sm table-striped table-bordered" aria-describedby="logs-page-heading">
        <thead>
          <tr title="click to order">
            <th>
              <span>
                <Translate contentKey="logs.table.name">Name</Translate>
              </span>
            </th>
            <th>
              <span>
                <Translate contentKey="logs.table.level">Level</Translate>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {loggers.filter(filterFn).map((logger, i) => (
            <tr key={`log-row-${i}`}>
              <td>
                <small>{logger.name}</small>
              </td>
              <td>
                <button
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'TRACE')}
                  className={getClassName(logger.level, 'TRACE', 'primary')}
                >
                  TRACE
                </button>
                <button
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'DEBUG')}
                  className={getClassName(logger.level, 'DEBUG', 'success')}
                >
                  DEBUG
                </button>
                <button
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'INFO')}
                  className={getClassName(logger.level, 'INFO', 'info')}
                >
                  INFO
                </button>
                <button
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'WARN')}
                  className={getClassName(logger.level, 'WARN', 'warning')}
                >
                  WARN
                </button>
                <button
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'ERROR')}
                  className={getClassName(logger.level, 'ERROR', 'danger')}
                >
                  ERROR
                </button>
                <button
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'OFF')}
                  className={getClassName(logger.level, 'OFF', 'secondary')}
                >
                  OFF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsPage;
