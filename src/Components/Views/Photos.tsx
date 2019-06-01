import React from "react";
import { Photo } from "../../Utils/Types";
import { FlexRow, FlexList } from "../../Styles/BasicStyles";

export const SinglePhoto: React.FC<Photo> = photo => {
  return (
    <FlexRow>
      <img src={photo.thumbnailUrl} alt={photo.title} />
      <p>{photo.title}</p>
    </FlexRow>
  );
};

export const PhotoList: React.FC<{ photos: Photo[] }> = ({ photos }) => {
  return (
    <FlexList>
      {photos.map(photo => (
        <SinglePhoto key={photo.id} {...photo} />
      ))}
    </FlexList>
  );
};
