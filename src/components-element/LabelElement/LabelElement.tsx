import { JobType } from "type/JobType/JobType";
import { useMemo } from "react";
import styled from "styled-components";

type Props = {
  title: JobType | string;
};

interface ILabelElementSection {
  primaryBackColor: string;
}

interface ICircle {
  primaryColor: string;
}

const LabelElement = ({ title }: Props) => {
  const primaryColor = useMemo(() => {
    switch (title) {
      case "design":
        return "rgb(234, 67, 62)";
      case "front-end":
        return "rgb(80, 242, 224)";
      case "back-end":
        return "rgb(59, 33, 212)";
      default:
        return "black";
    }
  }, [title]);

  const primaryBackColor = useMemo(() => {
    switch (title) {
      case "design":
        return "rgba(234, 67, 62, 0.2)";
      case "front-end":
        return "rgba(80, 242, 224, 0.2)";
      case "back-end":
        return "rgba(59, 33, 212, 0.2)";
      default:
        return "black";
    }
  }, [title]);

  return (
    <LabelElementSection primaryBackColor={primaryBackColor}>
      <LabelItem>
        <Circle primaryColor={primaryColor} />
        <div>{title}</div>
      </LabelItem>
    </LabelElementSection>
  );
};

export default LabelElement;

const LabelElementSection = styled.section<ILabelElementSection>`
  background-color: ${(props) => props.primaryBackColor};
  font-size: 12px;
  border-radius: 8px;
  height: 27px;
`;

const LabelItem = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  & > * + * {
    margin-left: 4px;
  }
`;

const Circle = styled.div<ICircle>`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: ${(props) => props.primaryColor};
`;

/**
 * design color : 234, 67, 62
 * front end dev color : 80, 242, 224
 * back end dev color : 95, 47, 220
 * qa, anyting color : 255, 170, 0
 * TODO: 모든 background-color는 해당하는 값에 대한 lighten 10%, opacity: 0.3
 */
