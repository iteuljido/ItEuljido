import { JobType } from "type/JobType/JobType";
import { useMemo } from "react";
import styled from "styled-components";
import { transparentize } from "polished";

type Props = {
  title: JobType | string;
};

interface IPromaryColor {
  primaryColor: string;
}

const LabelElement = ({ title }: Props) => {
  const primaryColor = useMemo(() => {
    switch (title) {
      case "Design":
        return "#c6538c";
      case "FrontEnd":
        return "#2b7489";
      case "BackEnd":
        return "#b07219";
      case "Android":
        return "#A97BFF";
      case "Window":
        return "#178600";
      case "Embedded":
        return "#555555";
      case "iOS":
        return "#ffac45";
      case "AI":
        return "#3572A5";
      case "QA":
        return "#705199";
      case "Game":
        return "#f34b7d";
      case "Planner":
        return "#C35817";
      case "CTO":
        return "#26abd7";
      case "CEO":
        return "#c5c9e5";
      default:
        return "black";
    }
  }, [title]);

  return (
    <LabelElementSection primaryColor={primaryColor}>
      <LabelItem>
        <Circle primaryColor={primaryColor} />
        <div>{title}</div>
      </LabelItem>
    </LabelElementSection>
  );
};

export default LabelElement;

const LabelElementSection = styled.section<IPromaryColor>`
  background-color: ${(props) => `${transparentize(0.8, props.primaryColor)}`};
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

const Circle = styled.div<IPromaryColor>`
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
