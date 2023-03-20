import React, { useReducer } from "react";
import { signOut } from "next-auth/react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { ZoomMtgParams } from "./index";

type FormState = {
  userName: string;
  userRole: string;
  meetingUrl: string;
};

const parseMeetingUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const meetingNumber = parsedUrl.pathname.replace(/\D/g, "");
  if (!meetingNumber) {
    throw new Error("Invalid meeting URL");
  }
  const password = parsedUrl.searchParams.get("pwd") || "";
  return {
    meetingNumber,
    password,
  };
};

const MeetingUrlForm = ({
  meetingUrl,
  onChange,
}: {
  meetingUrl?: string;
  onChange: (value: string) => void;
}) => {
  const checkIsInvalid = () => {
    if (!meetingUrl) {
      return false;
    }
    try {
      return !parseMeetingUrl(meetingUrl);
    } catch {
      return true;
    }
  };
  const isInvalid = checkIsInvalid();
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>Meeting URL</FormLabel>
      <Input
        type="text"
        value={meetingUrl}
        placeholder="https://zoom.us/j/xxxxx"
        onChange={({ target }) => onChange(target.value)}
      />
      {isInvalid ? (
        <FormErrorMessage>Zoom meeting URL is invalid</FormErrorMessage>
      ) : (
        <FormHelperText>Zoom meeting URL</FormHelperText>
      )}
    </FormControl>
  );
};

const JoinMeetingButton = ({
  formState,
  onJoinClick,
}: {
  formState: Partial<FormState>;
  onJoinClick: () => void;
}) => {
  const checkIsDisabled = () => {
    if (!formState.userName) {
      return true;
    }
    if (!formState.userRole) {
      return true;
    }
    if (!formState.meetingUrl) {
      return true;
    }
    try {
      return !parseMeetingUrl(formState.meetingUrl);
    } catch {
      return true;
    }
  };
  return (
    <Button
      onClick={onJoinClick}
      colorScheme="blue"
      isDisabled={checkIsDisabled()}
    >
      Join Meeting
    </Button>
  );
};

export const Form = ({
  onJoin,
}: {
  onJoin: (props: ZoomMtgParams) => void;
}) => {
  const [formState, updateFormState] = useReducer(
    (prev: Partial<FormState>, next: Partial<FormState>) => {
      const newParams = { ...prev, ...next };
      localStorage.setItem("userName", newParams.userName || "");
      localStorage.setItem("userRole", newParams.userRole || "");
      localStorage.setItem("meetingUrl", newParams.meetingUrl || "");
      return newParams;
    },
    {
      userName: localStorage.getItem("userName") || "sound crew",
      userRole: localStorage.getItem("userRole") || "0",
      meetingUrl: localStorage.getItem("meetingUrl") || "",
    }
  );

  const onJoinClick = () => {
    const validUrl = parseMeetingUrl(formState.meetingUrl!);
    onJoin({
      userName: formState.userName!,
      userRole: formState.userRole!,
      ...validUrl!,
    });
  };

  return (
    <Container>
      <Stack>
        <Heading as="h1">Sound crew</Heading>
        <Box>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={formState.userName}
              onChange={({ target }) =>
                updateFormState({ userName: target.value })
              }
            />
            <FormHelperText>Bot name</FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Select
              value={formState.userRole}
              onChange={({ target }) =>
                updateFormState({ userRole: target.value })
              }
            >
              <option value="0">Attendee</option>
              <option value="1">Host</option>
            </Select>
            <FormHelperText>Bot role</FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <MeetingUrlForm
            meetingUrl={formState.meetingUrl}
            onChange={(value) => updateFormState({ meetingUrl: value })}
          />
        </Box>
        <Flex>
          <Spacer />
          <ButtonGroup spacing="6">
            <Button variant="outline" onClick={() => signOut()}>
              SignOut
            </Button>
            <JoinMeetingButton
              formState={formState}
              onJoinClick={onJoinClick}
            />
          </ButtonGroup>
        </Flex>
      </Stack>
    </Container>
  );
};
