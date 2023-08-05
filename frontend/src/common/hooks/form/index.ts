import { useCallback, useState } from 'react';
type SubmitFunction<T> = (params: {
  event:
    | React.FormEvent<HTMLFormElement>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>;
  values: T;
}) => Promise<void>;
export function useForm<T>(initialState: T) {
  const [state, setState] = useState(initialState);
  const onChange =
    (name: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [name]: e.target.value,
      });
    };

  const setValue =
    <Type extends keyof T>(name: Type) =>
    (value: T[Type]) => {
      setState({
        ...state,
        [name]: value,
      });
    };
  const set = <Type extends keyof T>(name: Type, value: T[Type]) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const setValues = (values: Partial<T>) => {
    setState((pastState) => ({ ...pastState, ...values }));
  };
  const onSubmit = useCallback(
    (handleSubmit: SubmitFunction<T>) =>
      async (
        e:
          | React.FormEvent<HTMLFormElement>
          | React.MouseEvent<HTMLButtonElement, MouseEvent>,
      ) => {
        e.preventDefault();
        await handleSubmit({ event: e, values: state });
      },
    [state],
  );

  return [state, { onChange, setValue, setValues, set }, onSubmit] as const;
}
