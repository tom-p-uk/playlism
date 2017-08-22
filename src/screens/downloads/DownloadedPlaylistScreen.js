import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import SongsInAllDownloadsList from '../../components/SongsInAllDownloadsList';

class DownloadedPlaylistScreen extends Component {
  render() {
    const { downloadedSongs } = this.props;
    return <SongsInAllDownloadsList  data={downloadedSongs} />
  }
};

const mapStateToProps = ({ downloads: { downloadedSongs } }) => {
  return {
    downloadedSongs,
  };
};

export default connect(mapStateToProps)(DownloadedPlaylistScreen);
