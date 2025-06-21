import { StyledTextField } from "./style/TextField_styled"

export const TextField = () => {
    return <StyledTextField>
        <label>Label</label>
        <div>
            <input type="text" />
            <fieldset>
                <legend>legend</legend>
            </fieldset>
        </div>
    </StyledTextField>
}