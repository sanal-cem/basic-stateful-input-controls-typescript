# basic-stateful-input-controls-typescript

Stateful web controls via Typescript. Less code written as much as possible.

Features:
1. Border colors of input elements change after focusing the input element.
2. Auto calculation occurs while tapping into input elements.
3. Calculation result appears in the input elements.
4. *, /, +, - calculations should be calculated inside written expression.
5. Border colors imply that written expression is correct or not.
6. `?` appears when the expression is incorrect.
7. `Destroy everything` button erases all variables, props, states, etc.
8. Responsive Design
9. Prettier configured. (Please write `npx prettier --write .` to the console :))

After executing `npm start`, below screen appears:

<img alt="Initially Input Controls Test" src="./img/initially_input_controls_test.png" />


Focusing `NumericInput`:

<img alt="Input Element Focused" src="./img/input_element_focused.png" />


Responsive display on mobile phone:

<img alt="Responsive Display on mobile phone" src="./img/responsive_display_on_mobile_phone.png" />


Correct expression written into CalcInput:

<img alt="Correct Expression Written into CalcInput" src="./img/correct_expression_written_into_calcinput.png" />


False expressions written into NumericInput and CalcInput:

<img alt="Correct Expression Written into NumericInput and CalcInput" src="./img/false_expressions_written_into_numericinput_calcinput.png" />


False expressions written into Custom Syle:

<img alt="Correct Expressions Written into Custom Syle" src="./img/correct_expressions_written_into_custom_style.png" />


## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the apps packages and any packages that it depends on.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npx prettier --write .`

Beautifies the entire project.