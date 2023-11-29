import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { useContext, useRef, useState, FormEvent } from 'react';
import { Avatar } from 'primereact/avatar';
import placeholder_avatar from '../img/placeholder_avatar.png';
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useForm } from '../service/hooks';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      user {
        username
      }
      token
    }
  }
`;

function CreateAccount() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.username || values.username.length < 3) {
      setErrors(['Username needs to be minimum 3 characters']);
    }

    if (!values.password || values.password.length < 3) {
      setErrors(['Password needs to be minimum 3 characters']);
    }

    if (!checked) {
      setErrors(['You need to accept the terms of service']);
    }

    if (errors.length == 0) {
      createUser();
    } else {
      console.log('Validation failed');
      // Display validation errors using the toast
      toast.current?.replace({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    }
  };

  const { onChange, values } = useForm({
    username: '',
    password: '',
  });

  const [createUser] = useMutation(CREATE_USER, {
    update(proxy, { data: { createUser: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      setErrors([graphQLErrors[0].message]);
    },
    variables: { username: values.username, password: values.password },
  });

  const [checked, setChecked] = useState(false);

  const toast = useRef<Toast>(null);

  const show = () => {
    toast.current?.replace({
      severity: 'info',
      summary: 'Terms of Service',
      detail: 'Man skal ikke plage andre, man skal være grei og snill, og for øvrig kan man gjøre hva man vil.',
    });
  };

  return (
    <>
      <Toast ref={toast} data-testid="createAccountToast" />
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">
            <Avatar image={placeholder_avatar} size="xlarge" shape="circle" />
            <div className="text-900 text-3xl font-medium mb-3">Welcome to Deckbuilder!</div>
            <span className="text-600 font-medium line-height-3">Already have an account?</span>
            <Link to="../login" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
              Log in here!
            </Link>
          </div>
          <form onSubmit={validateForm}>
            <div className="card flex justify-content-center w-full mb-2">
              <span className="p-float-label w-full mb-3">
                <InputText
                  required={true}
                  type="username"
                  name="username"
                  id="username"
                  className="w-full mb-3"
                  onChange={onChange}
                  data-testid="createAccountUsername"
                />
                <label id="usernameLabel" htmlFor="username">
                  Username
                </label>
              </span>
            </div>
            <div className="card flex justify-content-center w-full mb-2">
              <span className="p-float-label w-full mb-3 card flex">
                <InputText
                  aria-labelledby="passwordLabel"
                  required={true}
                  name="password"
                  type="password"
                  id="password"
                  className="w-full mb-3"
                  onChange={onChange}
                  data-testid="createAccountPassword"
                />
                <label id="usernameLabel" htmlFor="password">
                  Password
                </label>
              </span>
            </div>
            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <Checkbox
                  aria-labelledby="termsOfServiceLabel"
                  required={true}
                  type="checkbox"
                  name="termsOfService"
                  id="termsOfService"
                  onChange={(e) => setChecked(e.checked)}
                  checked={checked}
                  className="mr-2"
                  data-testid="createAccountTOS"
                />

                <label id="termsOfServiceLabel" htmlFor="termsOfService">
                  I accept the{' '}
                  <a href="javascript:undefined;" onClick={show} data-testid="createAccountTOSA">
                    Terms of Service
                  </a>
                </label>
              </div>
            </div>
            {errors.map(function (error) {
              return (
                <>
                  {setErrors([...new Set(errors)])};
                  {toast.current?.replace({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: error.message ? error.message : error,
                  })}
                  ;{setErrors([])};
                </>
              );
            })}
            <Button
              type="submit"
              label="Create account"
              icon="pi pi-user"
              className="w-full"
              data-testid="createAccountSubmit"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
