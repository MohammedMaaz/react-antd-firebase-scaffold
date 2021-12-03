import React from "react";
import { Tag, Input, Tooltip, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

export default class ItemsTagsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.value || this.props.defaultValue || [],
      inputVisible: false,
      inputValue: "",
      editInputIndex: -1,
      editInputValue: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      Array.isArray(this.props.value) &&
      prevProps.value !== this.props.value &&
      this.props.value !== this.state.tags
    ) {
      this.setState({ tags: this.props.value });
    }

    if (typeof this.props.onChange !== "function") return;

    if (this.state.tags.length === 0) this.props.onChange(undefined);
    if (prevState.tags.length !== this.state.tags.length)
      this.props.onChange(this.state.tags);
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let tags = this.state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: "",
      };
    });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  saveEditInputRef = (input) => {
    this.editInput = input;
  };

  render() {
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } =
      this.state;
    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className={styles["tag_input"]}
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className={styles["edit_tag"]}
              key={tag}
              closable={this.props.editable}
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  if (!this.props.editable) return e.preventDefault();
                  this.setState(
                    { editInputIndex: index, editInputValue: tag },
                    () => {
                      this.editInput.focus();
                    }
                  );
                  e.preventDefault();
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {this.props.editable ? (
          <>
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                className={styles["tag_input"]}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Button
                type="primary"
                onClick={this.showInput}
                icon={<PlusOutlined />}
              >
                Add New
              </Button>
            )}
          </>
        ) : null}
      </>
    );
  }
}

ItemsTagsList.defaultProps = {
  editable: true,
};
