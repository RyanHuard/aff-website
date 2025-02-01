import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  Card,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const OfferInput = ({
  currentPlayer,
  handleSubmitOffer,
  inputOffer,
  setInputOffer,
  finalOfferIsChecked,
  handleFinalOfferCheck,
  finalOfferChecks,
  numChecked,
  countdownSeconds
}) => {
  const handleInputChange = (e) => setInputOffer(e.target.value);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmitOffer(event);
    }
  };

  return (
    <FormControl>
      <FormLabel >Offer</FormLabel>
      <Input
        bg="white"
        mb="1rem"
        rounded="0"
        className="drop-shadow-md"
        placeholder="$/years (e.g. 4/3)"
        value={inputOffer}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress} />
      <div className="flex gap-4 font-semibold">
        <form onSubmit={handleSubmitOffer}>
        <Button className="h-9" type="submit">
          Submit
        </Button>
        </form>
        <div className="my-auto flex">
          <input
            type="checkbox"
            className="w-5 accent-aff-blue"
            checked={finalOfferIsChecked}
            onChange={handleFinalOfferCheck}
          />
          <div className="ml-2">
            Final offer? ({numChecked}/{finalOfferChecks.length})
          </div>
          <div className="ml-2 text-red-600">{countdownSeconds > 0 && countdownSeconds}</div>
        </div>
      </div>
    </FormControl>
  );
};

export default OfferInput;