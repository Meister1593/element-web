/*
 * Copyright 2025 New Vector Ltd.
 *
 * SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
 * Please see LICENSE files in the repository root for full details.
 */

import React, { type MouseEventHandler } from "react";

import { MatrixClientPeg } from "../../../MatrixClientPeg";
import MatrixClientContext from "../../../contexts/MatrixClientContext";
import { ResetIdentityBody, type ResetIdentityBodyVariant } from "../settings/encryption/ResetIdentityBody";

interface ResetIdentityDialogProps {
    /**
     * Called when the dialog closes.
     */
    onFinished: () => void;
    /**
     * Called when the identity is reset.
     */
    onResetFinished: MouseEventHandler<HTMLButtonElement>;
    /**
     * Called when the cancel button is clicked.
     */
    onCancelClick: () => void;

    /**
     * Which variant of this dialog to show.
     */
    variant: ResetIdentityBodyVariant;
}

/**
 * The dialog for resetting the identity of the current user.
 */
export function ResetIdentityDialog({
    onFinished,
    onCancelClick,
    onResetFinished,
    variant,
}: ResetIdentityDialogProps): JSX.Element {
    const matrixClient = MatrixClientPeg.safeGet();

    // Wrappers for ResetIdentityBody's callbacks so that onFinish gets called
    // whenever the reset is done, whether by completing successfully, or by
    // being cancelled
    const onResetWrapper: MouseEventHandler<HTMLButtonElement> = (...args) => {
        onFinished();
        onResetFinished(...args);
    };
    const onCancelWrapper: () => void = () => {
        onFinished();
        onCancelClick();
    };
    return (
        <MatrixClientContext.Provider value={matrixClient}>
            <ResetIdentityBody onFinish={onResetWrapper} onCancelClick={onCancelWrapper} variant={variant} />
        </MatrixClientContext.Provider>
    );
}
