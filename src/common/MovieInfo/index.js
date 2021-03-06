import { useEffect } from "react";
import { useState } from "react";
import { getPosterURLpath } from "../../logic/getURLpath";
import { Placeholder } from "../Placeholder";
import {
  Caption,
  Description,
  Info,
  MainInfo,
  Poster,
  ProductionRelease,
  Rate,
  Ratings,
  Span,
  StarIcon,
  SubTitle,
  Tag,
  Tags,
  Title,
  Wrapper,
} from "./styled";

export const MovieInfo = ({
  poster,
  title,
  description,
  date,
  fullCountryName,
  votes,
  rate,
  person,
  genres,
  fullDate,
}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 767;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <>
      <Wrapper>
        {poster ? (
          <Poster person={person} src={getPosterURLpath(poster)} alt="" />
        ) : (
          <Placeholder person={person} />
        )}
        <Description>
          <Title>{title}</Title>
          <SubTitle>{date}</SubTitle>
          <ProductionRelease>
            <Info>
              <Span>Production: </Span>
              {fullCountryName}
            </Info>
            <Info>
              <Span>Release date: </Span>
              {fullDate}
            </Info>
          </ProductionRelease>
          <Tags>
            {genres && genres.map((genre) => <Tag key={genre}>{genre}</Tag>)}
          </Tags>
          {votes ? (
            <Ratings>
              <StarIcon />

              <Rate>
                {rate}
                {width > breakpoint ? <Span rate>/10</Span> : ""}
              </Rate>
              <Caption>{votes} votes</Caption>
            </Ratings>
          ) : (
            <Ratings>
              <Caption>{person ? "" : "No votes yet"} </Caption>
            </Ratings>
          )}
        </Description>
        <MainInfo>{description}</MainInfo>
      </Wrapper>
    </>
  );
};
