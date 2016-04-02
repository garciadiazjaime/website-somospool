import React from 'react';

import restClient from '../../../../../server/helpers/rest-client';
import slugUtil from '../../../../utils/slug';
import Block1 from './block1';

export default class ProjectSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      project: {},
    };
  }

  componentDidMount() {
    let project;
    const { projectSlug } = this.props.params;
    const { projects } = this.props.portfolio;
    for (let i = 0, len = projects.length; i < len; i++) {
      const slug = slugUtil(projects[i].title);
      if (projectSlug.toLowerCase() === slug.toLowerCase()) {
        project = projects[i];
        break;
      }
    }

    const promises = [];
    if (project) {
      promises.push(restClient({
        path: 'http://127.0.0.1:8000/api/block/?project_id=' + project.id,
      }));
    }

    if (promises.length) {
      Promise.all(promises).then((data) => {
        this.setState({
          project: {
            info: project,
            blocks: data[0].entity,
          },
        });
      });
    }
  }

  render() {
    const { project } = this.state;
    return (<div>
      <Block1 project={project} />
    </div>);
  }
}

ProjectSection.propTypes = {
  params: React.PropTypes.any,
  portfolio: React.PropTypes.object,
};
