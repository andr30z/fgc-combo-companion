package com.fgc.combo.companion.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.PlaylistCombo;

public interface PlaylistComboRepository extends JpaRepository<PlaylistCombo, UUID> {

    /**
     * Delete all user with ids specified in {@code ids} parameter
     * 
     * @param ids List of user ids
     */
    @Modifying
    @Query("delete from PlaylistCombo pc where pc.id in ?1")
    void deletePlaylistCombos(List<UUID> ids);

    @Modifying
    @Query("delete from PlaylistCombo pc where pc.playlist = ?1")
    void deleteByPlaylist(Playlist playlist);

    @EntityGraph(attributePaths = { "playlist.owner", "combo.owner" })
    List<PlaylistCombo> findAllByIdInAndPlaylist(List<UUID> id, Playlist playlist);
}
