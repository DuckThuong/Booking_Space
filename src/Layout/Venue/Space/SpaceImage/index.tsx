import {
  Button,
  Col,
  Row,
  Image,
  Modal,
  message,
  Popconfirm,
  notification,
} from "antd";
import FormWrap from "../../../../Components/Form/FormWrap";
import "./spaceImage.scss";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { useState, useCallback } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useDropzone } from "react-dropzone";
import { FormInput } from "../../../../Components/Form/FormInput";
import ReactPlayer from "react-player";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const SpaceImage = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<any>(null);
  const [cropper, setCropper] = useState<any>(null);
  const [workspaceImages, setWorkspaceImages] = useState<string[]>([]);
  const [surroundingImages, setSurroundingImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);

  const [imageList, setImageList] = useState([
    {
      key: 1,
      url: "https://ezcloud.vn/wp-content/uploads/2022/07/Thumbnail-Post-.png",
    },
  ]);

  const handleDelete = (key: number) => {
    setImageList(imageList.filter((img) => img.key !== key));
    notification.open({
      message: "Thông báo!",
      description: "Xóa ảnh thành công.",
      placement: "topRight",
      showProgress: true,
      style: {
        backgroundColor: "#ffffff",
        borderLeft: "4px solid #007bff",
      },
    });
  };

  const handleEdit = (image: any) => {
    setCurrentImage(image);
    setIsEditModalVisible(true);
  };

  const handleCrop = () => {
    if (cropper) {
      const croppedImage = cropper.getCroppedCanvas().toDataURL();
      setImageList(
        imageList.map((img) =>
          img.key === currentImage.key ? { ...img, url: croppedImage } : img
        )
      );
      setIsEditModalVisible(false);
      notification.open({
        message: "Thông báo!",
        description: "Cắt ảnh thành công.",
        placement: "topRight",
        showProgress: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
    }
  };

  const onDropWorkspace = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setWorkspaceImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const onDropSurrounding = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setSurroundingImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const {
    getRootProps: getWorkspaceRootProps,
    getInputProps: getWorkspaceInputProps,
    isDragActive: isWorkspaceDragActive,
  } = useDropzone({
    onDrop: onDropWorkspace,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });

  const {
    getRootProps: getSurroundingRootProps,
    getInputProps: getSurroundingInputProps,
    isDragActive: isSurroundingDragActive,
  } = useDropzone({
    onDrop: onDropSurrounding,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
      notification.open({
        message: "Thông báo!",
        description: "Tải lên file PDF thành công.",
        placement: "topRight",
        showProgress: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
    } else {
      notification.error({
        message: "Lỗi!",
        description: "Vui lòng chọn file PDF.",
        placement: "topRight",
      });
    }
  };

  return (
    <div className="space_image">
      <FormWrap className="space_image-form">
        <h1 className="space_image-header">
          Hình ảnh{" "}
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/pastel-glyph/64/information--v1.png"
            alt="information--v1"
            style={{ marginInlineStart: 8 }}
          />
        </h1>
        <Row className="space_image-section-1">
          <p className="space_image-section-1-text">
            Mọi người đều thích ảnh. Hãy khoe không gian của bạn bằng những bức
            ảnh và video tuyệt đẹp. Những chỗ nghỉ có ảnh có khả năng được đặt
            chỗ, yêu thích hoặc chia sẻ cao gấp mười lần.
          </p>
        </Row>
        <Row className="space_image-section-2">
          <Col span={20}>
            <span>Ảnh của tôi</span>
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/color/48/help--v1.png"
              alt="help--v1"
            />
          </Col>
          <Col span={4}>
            <Button icon={<PlusOutlined />}>Tải thêm ảnh lên</Button>
          </Col>
        </Row>
        <Row className="space_image-section-3">
          <Col span={24}>
            <div className="image-gallery">
              <Image.PreviewGroup>
                <Row gutter={[16, 16]}>
                  {imageList.map((image) => (
                    <Col span={8} key={image.key}>
                      <div className="image-container">
                        <Image
                          width={160}
                          height={140}
                          preview={false}
                          src={image.url}
                          key={image.key}
                          alt={`Space image ${image.key}`}
                        />
                        <div className="image-actions">
                          <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(image)}
                          />
                          <Popconfirm
                            title="Bạn có chắc chắn muốn xóa ảnh này?"
                            onConfirm={() => handleDelete(image.key)}
                            okText="Có"
                            cancelText="Không"
                          >
                            <Button type="text" icon={<DeleteOutlined />} />
                          </Popconfirm>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Image.PreviewGroup>
            </div>
          </Col>
        </Row>
        <Row className="space_image-section-4">
          <Col span={12}>
            <p className="space_image-section-4-text">Ảnh khu vực làm việc</p>
          </Col>
          <Col span={12}>
            <p className="space_image-section-4-text">Ảnh khu vực xung quanh</p>
          </Col>
        </Row>
        <Row className="space_image-section-5">
          <Col span={12}>
            <div className="dropped-images-container">
              {workspaceImages.length > 0 ? (
                <Image.PreviewGroup>
                  <Row gutter={[16, 16]}>
                    {workspaceImages.map((image, index) => (
                      <Col span={8} key={index}>
                        <Image
                          width={160}
                          height={140}
                          src={image}
                          alt={`Workspace image ${index + 1}`}
                        />
                      </Col>
                    ))}
                  </Row>
                </Image.PreviewGroup>
              ) : (
                <div className="no-images-message">
                  <p>Chưa có ảnh nào được thêm vào</p>
                </div>
              )}
            </div>

            <div {...getWorkspaceRootProps()} className="dropzone-container">
              <input {...getWorkspaceInputProps()} />
              {isWorkspaceDragActive ? (
                <p>Thả ảnh vào đây...</p>
              ) : (
                <div className="dropzone-content">
                  <UploadOutlined style={{ fontSize: "32px" }} />
                  <p>Kéo thả ảnh vào đây hoặc click để chọn ảnh</p>
                  <p className="dropzone-hint">Hỗ trợ: JPG, JPEG, PNG</p>
                </div>
              )}
            </div>
          </Col>
          <Col span={12}>
            <div className="dropped-images-container">
              {surroundingImages.length > 0 ? (
                <Image.PreviewGroup>
                  <Row gutter={[16, 16]}>
                    {surroundingImages.map((image, index) => (
                      <Col span={8} key={index}>
                        <Image
                          width={160}
                          height={140}
                          src={image}
                          alt={`Surrounding image ${index + 1}`}
                        />
                      </Col>
                    ))}
                  </Row>
                </Image.PreviewGroup>
              ) : (
                <div className="no-images-message">
                  <p>Chưa có ảnh nào được thêm vào</p>
                </div>
              )}
            </div>
            <div {...getSurroundingRootProps()} className="dropzone-container">
              <input {...getSurroundingInputProps()} />
              {isSurroundingDragActive ? (
                <p>Thả ảnh vào đây...</p>
              ) : (
                <div className="dropzone-content">
                  <UploadOutlined style={{ fontSize: "32px" }} />
                  <p>Kéo thả ảnh vào đây hoặc click để chọn ảnh</p>
                  <p className="dropzone-hint">Hỗ trợ: JPG, JPEG, PNG</p>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <div className="space_image-section-6">
          <Row className="space_image-section-6-item">
            <Col span={8}>
              {videoUrl ? (
                <ReactPlayer
                  url={videoUrl}
                  width="250px"
                  height="150px"
                  controls
                  className="space_image-section-6-iframe"
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 },
                    },
                  }}
                />
              ) : (
                <div className="space_image-section-6-iframe">
                  <svg width="48" height="48" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="24" fill="#fff" />
                    <polygon points="20,16 34,24 20,32" fill="#ccc" />
                  </svg>
                </div>
              )}
            </Col>
            <Col span={16}>
              <p className="space_image-section-1-text">Video tour.</p>
              <FormInput
                name={"videoUrl"}
                inputProps={{
                  placeholder: "Nhập đường dẫn video của không gian vào đây.",
                  onChange: (e) => setVideoUrl(e.target.value),
                }}
              />
            </Col>
          </Row>
          <Row className="space_image-section-6-item">
            <Col span={8}>
              {videoUrl ? (
                <ReactPlayer
                  url={videoUrl}
                  width="250px"
                  height="150px"
                  controls
                  className="space_image-section-6-iframe"
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 },
                    },
                  }}
                />
              ) : (
                <div className="space_image-section-6-iframe">
                  <svg width="48" height="48" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="24" fill="#fff" />
                    <polygon points="20,16 34,24 20,32" fill="#ccc" />
                  </svg>
                </div>
              )}
            </Col>
            <Col span={16}>
              <p className="space_image-section-1-text">Video tham khảo</p>
              <FormInput
                name={"viewingUrl"}
                inputProps={{
                  placeholder:
                    "Nhập đường dẫn video tham khảo của không gian vào đây.",
                  onChange: (e) => setVideoUrl(e.target.value),
                }}
              />
            </Col>
          </Row>
          <Row className="space_image-section-6-item">
            <Col span={8}>
              {pdfFile ? (
                <div className="pdf-preview">
                  <Document
                    file={pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="pdf-document"
                  >
                    <Page pageNumber={1} width={250} />
                  </Document>
                  <p className="pdf-page-info">Trang 1 / {numPages}</p>
                </div>
              ) : (
                <div className="pdf-placeholder">
                  <FilePdfOutlined
                    style={{ fontSize: "48px", color: "#ccc" }}
                  />
                  <p>Chưa có file PDF</p>
                </div>
              )}
            </Col>
            <Col span={16}>
              <p className="space_image-section-1-text">Poster / Tờ rơi</p>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                style={{ display: "none" }}
                id="pdf-upload"
              />
              <Button
                onClick={() => document.getElementById("pdf-upload")?.click()}
              >
                Chọn poster/tờ rơi dạng PDF
              </Button>
            </Col>
          </Row>
        </div>
      </FormWrap>

      <Modal
        title="Chỉnh sửa ảnh"
        open={isEditModalVisible}
        onOk={handleCrop}
        onCancel={() => setIsEditModalVisible(false)}
        width={800}
        zIndex={9999}
        className="modal_edit-image"
        okText={"Lưu"}
        cancelText={"Hủy bỏ"}
      >
        {currentImage && (
          <Cropper
            src={currentImage.url}
            style={{ height: 400, width: "100%" }}
            aspectRatio={16 / 9}
            guides={true}
            onInitialized={(instance) => setCropper(instance)}
          />
        )}
      </Modal>
    </div>
  );
};
