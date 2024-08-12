import React from 'react';

type ImagePreviewProps = {
    setFile: (val: any) => void;
    file: any;
 }
const ImagePreview: React.FC<ImagePreviewProps> = ({setFile, file}) => {
  return (
    <div className="image-preview">
            <div className="remove-img" onClick={() => setFile(null)}>
              <span>x</span>
            </div>
            <img src={URL.createObjectURL(file as any)} alt="" />
          </div>
  );
};

export default ImagePreview;