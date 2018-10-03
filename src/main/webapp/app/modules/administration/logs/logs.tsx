import React from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-jhipster';

import { getLoggers, changeLogLevel } from '../administration.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ILogsPageProps extends StateProps, DispatchProps {}

export interface ILogsPageState {
  filter: string;
}

export class LogsPage extends React.Component<ILogsPageProps, ILogsPageState> {
  state: ILogsPageState = {
    filter: ''
  };

  componentDidMount() {
    this.props.getLoggers();
  }

  getLogs = () => {
    if (!this.props.isFetching) {
      this.props.getLoggers();
    }
  };

  changeLevel = (loggerName, level) => () => {
    this.props.changeLogLevel(loggerName, level);
  };

  setFilter = evt => {
    this.setState({
      filter: evt.target.value
    });
  };

  getClassName = (level, check, className) => (level === check ? `btn btn-sm btn-${className}` : 'btn btn-sm btn-light');

  filterFn = l => l.name.toUpperCase().includes(this.state.filter.toUpperCase());

  render() {
    const { logs, isFetching } = this.props;
    const { filter } = this.state;
    const loggers = logs ? logs.loggers : [];
    return (
      <div>
        <h2 id="logs-page-heading">
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
        <input type="text" value={filter} onChange={this.setFilter} className="form-control" disabled={isFetching} />

        <table className="table table-sm table-striped table-bordered">
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
            {loggers.filter(this.filterFn).map((logger, i) => (
              <tr key={`log-row-${i}`}>
                <td>
                  <small>{logger.name}</small>
                </td>
                <td>
                  <button
                    disabled={isFetching}
                    onClick={this.changeLevel(logger.name, 'TRACE')}
                    className={this.getClassName(logger.level, 'TRACE', 'primary')}
                  >
                    TRACE
                  </button>
                  <button
                    disabled={isFetching}
                    onClick={this.changeLevel(logger.name, 'DEBUG')}
                    className={this.getClassName(logger.level, 'DEBUG', 'success')}
                  >
                    DEBUG
                  </button>
                  <button
                    disabled={isFetching}
                    onClick={this.changeLevel(logger.name, 'INFO')}
                    className={this.getClassName(logger.level, 'INFO', 'info')}
                  >
                    INFO
                  </button>
                  <button
                    disabled={isFetching}
                    onClick={this.changeLevel(logger.name, 'WARN')}
                    className={this.getClassName(logger.level, 'WARN', 'warning')}
                  >
                    WARN
                  </button>
                  <button
                    disabled={isFetching}
                    onClick={this.changeLevel(logger.name, 'ERROR')}
                    className={this.getClassName(logger.level, 'ERROR', 'danger')}
                  >
                    ERROR
                  </button>
                  <button
                    disabled={isFetching}
                    onClick={this.changeLevel(logger.name, 'OFF')}
                    className={this.getClassName(logger.level, 'OFF', 'secondary')}
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
  }
}

const mapStateToProps = ({ administration }: IRootState) => ({
  logs: administration.logs,
  isFetching: administration.loading
});

const mapDispatchToProps = { getLoggers, changeLogLevel };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogsPage);
