import {useState} from "react";
import {useRecoilValue} from "recoil";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
} from "@chakra-ui/react";
import {useJoinZoom} from "../hooks/useJoinZoom";
import {ZoomJoinParams} from "../libs/zoomClient";
import {soundContextState} from "../libs/soundContext";

export const Meeting = (zoomJoinParams: ZoomJoinParams) => {
  const soundContext = useRecoilValue(soundContextState);
  useJoinZoom(zoomJoinParams);
  const [volume, setVolumeState] = useState(100);
  const setVolume = (newVolume: string | number) => {
    soundContext.setVolume(Number(newVolume) / 100);
    setVolumeState(Number(newVolume));
  };
  return (
    <Container>
      <Stack>
        <ButtonGroup spacing="6">
          {soundContext.mapSounds((key, name) => (
            <Button
              key={key}
              onClick={() => {
                soundContext.playSound(key);
              }}
              colorScheme="blue"
            >
              {name}
            </Button>
          ))}
        </ButtonGroup>
        <Box width={200}>
          Volume
          <Slider
            aria-label="volume"
            value={volume}
            onChange={(value) => setVolume(value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Stack>
    </Container>
  );
};
