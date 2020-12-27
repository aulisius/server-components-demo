/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {unstable_useTransition} from 'react';

import {useLocation} from './LocationContext.client';

export default function CreateGame({children}) {
  const [, setLocation] = useLocation();
  const [startTransition, isPending] = unstable_useTransition();
  return (
    <button
      className={['edit-button', 'edit-button--solid'].join(' ')}
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          setLocation((loc) => ({
            selectedId: null,
            gameMode: 'admin',
            searchText: loc.searchText,
          }));
        });
      }}
      role="menuitem">
      {children}
    </button>
  );
}
