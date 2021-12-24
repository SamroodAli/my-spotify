import {
  ButtonGroup,
  IconButton,
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "../lib/formatters";

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const [showThumb, setShowThumb] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    let timerId;
    if (playing && !isSeeking) {
      const updateSeek = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(updateSeek);
      };

      timerId = requestAnimationFrame(updateSeek);
      return () => {
        cancelAnimationFrame(timerId);
      };
    }

    return cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  const setPlayState = (value) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    setShuffle((prevState) => !prevState);
  };

  const onRepeat = () => {
    setRepeat((prevState) => !prevState);
  };

  const prevSong = () => {
    setIndex((state) => {
      // if current song song is the first song, return the last song as previous, else return the song before the current song
      // shuffle logic is not implemented for previous song
      return state === 0 ? songs.length - 1 : state - 1;
    });
  };

  const nextSong = () => {
    const nextSongIndex = (prevSongIndex: number) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === prevSongIndex) {
          return nextSongIndex(prevSongIndex);
        }
        return next;
      }
      return prevSongIndex === songs.length - 1 ? 0 : prevSongIndex + 1;
    };

    setIndex((prevSongIndex) => nextSongIndex(prevSongIndex));
  };

  const onEnd = () => {
    if (repeat) {
      soundRef.current.seek(0); // repeat song by starting again from the beginning if repeat is on
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration(); // get current activesong duration
    setDuration(songDuration); // update ui with song duration
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0])); // update ui //rangeSlider gives u an array with min,max, the min is where the user dragged the seek bar to
    soundRef.current.seek(e[0]); // update playing song using react howler ref
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          ref={soundRef}
          playing={playing}
          src={activeSong?.url}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            icon={<MdShuffle />}
            color={shuffle ? "white" : "gray.600"}
            onClick={onShuffle}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="previous"
            fontSize="25px"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}

          <IconButton
            outline="none"
            variant="link"
            aria-label="next"
            fontSize="24px"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            color={repeat ? "white" : "gray.600"}
            fontSize="24px"
            icon={<MdOutlineRepeat />}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]} // eslint-disable-line jsx-a11y/aria-proptypes
              step={0.1}
              id="player-range"
              min={0}
              max={duration || 0}
              value={[seek]} // pass as min the current seek value to move the seek bar
              onChange={onSeek}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack
                bg="gray.800"
                onMouseOver={() => setShowThumb(true)}
                onMouseLeave={() => setShowThumb(false)}
              >
                <RangeSliderFilledTrack
                  bg={showThumb || isSeeking ? "green.500" : "gray.500"}
                />
              </RangeSliderTrack>
              <RangeSliderThumb
                onMouseOver={() => setShowThumb(true)}
                onMouseLeave={() => setShowThumb(false)}
                index={0}
                height={3}
                width={3}
                borderRadius="100%"
                sx={{
                  visibility: isSeeking || showThumb ? "visible" : "hidden",
                }}
              />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
