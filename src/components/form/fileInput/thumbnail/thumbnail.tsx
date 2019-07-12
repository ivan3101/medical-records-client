import React, { Component } from "react";
import Loader from "../../../loader/loader";

export interface IThumbnailProps {
  file: File;
}

export interface IThumbnailState {
  loading: boolean;
  thumb: string | ArrayBuffer | null;
}

class Thumbnail extends Component<IThumbnailProps, IThumbnailState> {
  state: IThumbnailState = {
    loading: false,
    thumb: null
  };

  componentDidUpdate(prevProps: Readonly<IThumbnailProps>): void {
    if (!this.props.file) return;

    if (prevProps.file !== this.props.file) {
      this.setState(() => ({
        loading: true
      }));

      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        this.setState({ loading: false, thumb: fileReader.result });
      };

      fileReader.readAsDataURL(this.props.file);
    }
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) return null;

    if (loading) return <Loader />;

    return (
      <img src={thumb as string} alt={file.name} height={200} width={200} />
    );
  }
}

export default Thumbnail;
