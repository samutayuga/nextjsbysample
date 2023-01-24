import {Configuration, OpenAIApi} from "openai";
import {Box, Button, TextField} from "@mui/material";
import React from "react";


import {values} from "typed-immutable-map";
import {create} from "zustand";

const useGenerationStore = create<IResume & IResumeAction>((set, get) => ({
    context: '',
    resume: '',
    recreate: () => {


    }


}))
const configuration = new Configuration({
    apiKey: "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",
});
const openAPi = new OpenAIApi(configuration)

interface IResume {
    context: string,
    resume: string
}

interface IResumeAction {
    recreate: (string) => void
}

async function callOpenAi(theValues) {


    const completion = await openAPi.createCompletion({
            model: "text-davinci-003",
            prompt: theValues.context,
            temperature: 0.6,
        }
    )


}

export default function CreateResume() {
    const [values, setValues] = React.useState({
        context: 'testing',
        resume: ''
    });
    const handleGenerate = (context) => event => {
        setValues({...values, [context]: event.target.value})
    }
    return (
        //crete input field
        <Box component="form" sx={{'& .MuiTextField-root': {m: 1, width: '25ch'},}} noValidate
             autoComplete="off">
            <div>
                <TextField
                    onChange={(newValue) => setValues({context: newValue.target.value, resume: ''})}
                    id="outlined-textarea"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    type="string"
                    name="context"
                    autoComplete="context"
                    multiline
                />
                <TextField name="resume" value={values.resume}/>
                <Button onClick={() => {
                    const completion = openAPi.createCompletion({
                            model: "text-davinci-003",
                            prompt: values.context,
                            temperature: 0.6,
                        }
                    )
                    completion.then((resp) => {
                        console.log(resp.data.choices[0].text)
                        values.resume = resp.data.choices[0].text
                    })

                }}>Generate</Button>
            </div>

        </Box>
    )

}