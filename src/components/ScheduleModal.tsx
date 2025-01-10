'use client';

import { type ButtonHTMLAttributes, type PropsWithChildren, type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Modal from './Modal';

type Props = ComponentPropsWithoutRef<typeof Modal> & {};

const ScheduleModal = ({children, close} : Props) => {
  return (
    <Modal close={close}>
      <h2 id="modal-title" className="mb-2 text-center">
        일정 추가
      </h2>
      <p id="modal-description" className=" mb-4 text-center">
        {children}
      </p>
    </Modal>
  )
}

export default ScheduleModal